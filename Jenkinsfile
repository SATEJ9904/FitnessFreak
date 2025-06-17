pipeline {
    agent any

    environment {
        IMAGE_NAME = 'satejshendage09/fitnessfreak'
        IMAGE_TAG = 'latest'
        DEPLOY_SERVER = '192.168.1.50'
        DEPLOY_USER = 'ubuntu'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'Jenkins_Key', url: 'https://github.com/SATEJ9904/FitnessFreak.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
              withCredentials([usernamePassword(credentialsId: 'Docker_Key', 
                usernameVariable: 'satejshendage09', 
                passwordVariable: 'Satej@9904')]) {
    sh 'echo $DOCKER_PWD | docker login -u $DOCKER_USER --password-stdin'
}
            }
        }

        stage('Deploy to Ubuntu Server') {
            steps {
                sshagent(['Ubuntu_SSH']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
                            docker pull ${IMAGE_NAME}:${IMAGE_TAG} &&
                            docker stop fitnessfreak || true &&
                            docker rm fitnessfreak || true &&
                            docker run -d --name fitnessfreak -p 80:80 ${IMAGE_NAME}:${IMAGE_TAG}
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
