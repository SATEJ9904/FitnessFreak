pipeline {
    agent any

    environment {
        IMAGE_NAME = 'satejshendage09/fitnessfreak'
        IMAGE_TAG = "${env.BUILD_NUMBER}"  // Use build number for versioning
        DEPLOY_SERVER = '192.168.1.50'
        DEPLOY_USER = 'micro'
        SSH_CREDENTIALS_ID = 'Ubuntu_SSH'
        DOCKER_CREDENTIALS_ID = 'Docker_Key'
        DOCKER_BUILDKIT = '1'  // Enable BuildKit for faster builds
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                credentialsId: 'Jenkins_Key', 
                url: 'https://github.com/SATEJ9904/FitnessFreak.git'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: DOCKER_CREDENTIALS_ID,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PWD'
                    )]) {
                        sh """
                            echo \$DOCKER_PWD | docker login -u \$DOCKER_USER --password-stdin
                            docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                            docker push ${IMAGE_NAME}:${IMAGE_TAG}
                            docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                            docker push ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Verify Server Connection') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
                            docker --version || exit 1
                        '
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} << 'EOF'
                            # Pull the specific version
                            docker pull ${IMAGE_NAME}:${IMAGE_TAG} || exit 1
                            
                            # Stop and remove old container
                            docker stop fitnessfreak || true
                            docker rm fitnessfreak || true
                            
                            # Run new container with health check
                            docker run -d \\
                              --name fitnessfreak \\
                              --restart unless-stopped \\
                              -p 80:80 \\
                              ${IMAGE_NAME}:${IMAGE_TAG}
                            
                            # Verify deployment
                            sleep 5  # Give container time to start
                            docker ps --filter "name=fitnessfreak" --filter "status=running" | grep fitnessfreak || exit 1
EOF
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Deployment of ${IMAGE_NAME}:${IMAGE_TAG} successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}