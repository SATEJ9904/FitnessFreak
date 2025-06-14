pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        DEPLOY_DIR = '/var/www/html/fitnessfreak'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', credentialsId: 'da6c6434-0cdb-446d-8964-a0ce0523aff8', url: 'git@github.com:SATEJ9904/FitnessFreak.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building the React app...'
                sh 'npm run build'
            }
        }

        stage('Prepare Deployment') {
            steps {
                echo 'Preparing deployment...'
                script {
                    // Check if directory exists and is writable
                    def dirExists = sh(script: "if [ -d ${DEPLOY_DIR} ]; then exit 0; else exit 1; fi", returnStatus: true) == 0
                    def dirWritable = sh(script: "if [ -w ${DEPLOY_DIR} ]; then exit 0; else exit 1; fi", returnStatus: true) == 0

                    if (!dirExists || !dirWritable) {
                        echo "Directory ${DEPLOY_DIR} needs setup"
                        sh """
                            sudo mkdir -p ${DEPLOY_DIR} || true
                            sudo chown -R jenkins:jenkins ${DEPLOY_DIR} || true
                            sudo chmod -R 755 ${DEPLOY_DIR} || true
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build...'
                sh """
                    rm -rf ${DEPLOY_DIR}/*
                    cp -r build/* ${DEPLOY_DIR}/
                """
            }
        }

        stage('Configure Nginx') {
            steps {
                echo 'Configuring Nginx...'
                script {
                    def nginxConfig = """
                    server {
                        listen 80;
                        server_name 192.168.1.50;

                        root ${DEPLOY_DIR};
                        index index.html;

                        location / {
                            try_files \$uri \$uri/ /index.html;
                        }
                    }
                    """

                    // Clear existing config if it exists and write new config
                    sh """
                        # Remove existing symlink if it exists
                        sudo [ -L /etc/nginx/sites-enabled/fitnessfreak ] && sudo rm /etc/nginx/sites-enabled/fitnessfreak || true
                        
                        # Remove existing config file if it exists
                        sudo [ -f /etc/nginx/sites-available/fitnessfreak ] && sudo rm /etc/nginx/sites-available/fitnessfreak || true
                        
                        # Create new config file
                        echo '${nginxConfig}' | sudo tee /etc/nginx/sites-available/fitnessfreak > /dev/null
                        
                        # Create symlink
                        sudo ln -sf /etc/nginx/sites-available/fitnessfreak /etc/nginx/sites-enabled/
                        
                        # Test and reload Nginx
                        sudo nginx -t && sudo systemctl reload nginx
                    """
                }
            }
        }
    }

    post {
        success {
            echo ' Deployment completed successfully!'
        }
        failure {
            echo ' Deployment failed!'
        }
    }
}