pipeline {
    agent any

    environment {
        IMAGE_NAME = 'satejshendage09/fitnessfreak'
        IMAGE_TAG = 'latest'
        DEPLOY_SERVER = '192.168.1.50'
        DEPLOY_USER = 'micro'
        SSH_CREDENTIALS_ID = 'Ubuntu_SSH'
        DOCKER_CREDENTIALS_ID = 'Docker_Key'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                credentialsId: 'Jenkins_Key', 
                url: 'https://github.com/SATEJ9904/FitnessFreak.git'
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
                withCredentials([usernamePassword(
                    credentialsId: DOCKER_CREDENTIALS_ID,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PWD'
                )]) {
                    sh """
                        echo \$DOCKER_PWD | docker login -u \$DOCKER_USER --password-stdin || {
                            echo "Docker login failed!"
                            exit 1
                        }
                        docker push ${IMAGE_NAME}:${IMAGE_TAG} || {
                            echo "Docker push failed!"
                            exit 1
                        }
                    """
                }
            }
        }

        stage('Verify Server Connection') {
            steps {
                script {
                    try {
                        sshagent([SSH_CREDENTIALS_ID]) {
                            sh """
                                echo "Testing SSH connection to ${DEPLOY_USER}@${DEPLOY_SERVER}"
                                ssh -vvv -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
                                    echo "SSH connection successful!"
                                    whoami
                                    docker --version || echo "Docker not installed"
                                '
                            """
                        }
                    } catch (err) {
                        echo "SSH Connection Test Failed: ${err}"
                        currentBuild.result = 'FAILURE'
                        error("Pipeline failed due to SSH connection issues")
                    }
                }
            }
        }

        stage('Deploy to Ubuntu Server') {
            steps {
                script {
                    try {
                        sshagent([SSH_CREDENTIALS_ID]) {
                            sh """
                                echo "Starting deployment to ${DEPLOY_SERVER}"
                                ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
                                    echo "Pulling latest image..."
                                    docker pull ${IMAGE_NAME}:${IMAGE_TAG} || {
                                        echo "Failed to pull image"
                                        exit 1
                                    }
                                    
                                    echo "Stopping existing container..."
                                    docker stop fitnessfreak || echo "No running container to stop"
                                    
                                    echo "Removing existing container..."
                                    docker rm fitnessfreak || echo "No container to remove"
                                    
                                    echo "Starting new container..."
                                    docker run -d --name fitnessfreak -p 80:80 ${IMAGE_NAME}:${IMAGE_TAG} || {
                                        echo "Failed to start container"
                                        exit 1
                                    }
                                    
                                    echo "Verifying deployment..."
                                    docker ps | grep fitnessfreak || {
                                        echo "Container not running"
                                        exit 1
                                    }
                                    echo "Deployment successful!"
                                '
                            """
                        }
                    } catch (err) {
                        echo "Deployment Failed: ${err}"
                        currentBuild.result = 'FAILURE'
                        error("Deployment stage failed")
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed with status: ${currentBuild.result}"
            cleanWs() // Clean workspace after build
        }
        success {
            echo '🎉 Deployment Successful!'
            // Add notification here (email, Slack, etc.)
        }
        failure {
            echo '❌ Deployment Failed!'
            // Add failure notification here
        }
    }
}