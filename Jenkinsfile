pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', credentialsId: 'Jenkins_Key', url: 'git@github.com:SATEJ9904/FitnessFreak.git'
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

        stage('Deploy Build Files') {
            steps {
                echo 'Deploying build to web server directory...'
                sh '''
                    sudo mkdir -p /var/www/html/fitnessfreak
                    sudo cp -r build/* /var/www/html/fitnessfreak/
                '''
            }
        }

        stage('Configure Nginx') {
            steps {
                echo 'Creating Nginx config, linking, opening port, and reloading Nginx...'
                sh '''
                    # Create Nginx config in sites-available
                    sudo tee /etc/nginx/sites-available/fitnessfreak > /dev/null <<EOF
server {
    listen 8085;
    server_name 192.168.1.50;

    root /var/www/html/fitnessfreak;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }
}
EOF

                    # Link to sites-enabled
                    sudo ln -sf /etc/nginx/sites-available/fitnessfreak /etc/nginx/sites-enabled/fitnessfreak

                    # Allow port 8085/tcp in UFW if not already allowed
                    sudo ufw allow 8085/tcp || true

                    # Test Nginx config and reload
                    sudo nginx -t && sudo systemctl reload nginx
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment and Nginx setup completed successfully!'
        }
        failure {
            echo '❌ Deployment failed or Nginx setup encountered an error.'
        }
    }
}
