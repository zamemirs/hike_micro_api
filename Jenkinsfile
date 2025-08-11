pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REPO_BACKEND = "590183739327.dkr.ecr.${AWS_REGION}.amazonaws.com/backend"
        ECR_REPO_FRONTEND = "590183739327.dkr.ecr.${AWS_REGION}.amazonaws.com/frontend"
        KUBECONFIG_CREDENTIALS = 'kubeconfig-eks'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/zamemirs/hike_micro_api.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_BACKEND
                docker build -t backend ./backend
                docker tag backend:latest $ECR_REPO_BACKEND:latest
                docker push $ECR_REPO_BACKEND:latest
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_FRONTEND
                docker build -t frontend ./frontend
                docker tag frontend:latest $ECR_REPO_FRONTEND:latest
                docker push $ECR_REPO_FRONTEND:latest
                """
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([file(credentialsId: KUBECONFIG_CREDENTIALS, variable: 'KUBECONFIG_FILE')]) {
                    sh """
                    export KUBECONFIG=$KUBECONFIG_FILE
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/frontend-deployment.yaml
                    """
                }
            }
        }
    }
}
