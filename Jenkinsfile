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

        stage('Prepare Deployment Directory') {
            steps {
                echo 'Preparing web directory...'
                sh '''
                    sudo mkdir -p /var/www/html/fitnessfreak
                    sudo chown -R $USER:$USER /var/www/html/fitnessfreak
                    sudo chmod -R 755 /var/www/html
                '''
            }
        }

        stage('Deploy Build Files') {
            steps {
                echo 'Deploying build to web server directory...'
                sh '''
                    rm -rf /var/www/html/fitnessfreak/*
                    cp -r build/* /var/www/html/fitnessfreak/
                '''
            }
        }

        stage('Configure Nginx') {
            steps {
                echo 'Configuring Nginx...'
                sh '''
                    # Create Nginx config
                    sudo tee /etc/nginx/sites-available/fitnessfreak > /dev/null <<EOF
server {
    listen 8085;
    server_name 192.168.1.50;

    root /var/www/html/fitnessfreak;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

                    # Enable site
                    sudo ln -sf /etc/nginx/sites-available/fitnessfreak /etc/nginx/sites-enabled/

                    # Remove default config if exists
                    sudo [ -f /etc/nginx/sites-enabled/default ] && sudo rm /etc/nginx/sites-enabled/default || true

                    # Open firewall port
                    sudo ufw allow 8085/tcp

                    # Test and reload Nginx
                    sudo nginx -t && sudo systemctl reload nginx
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment and Nginx setup completed successfully!'
            slackSend(color: 'good', message: 'Deployment to production succeeded')
        }
        failure {
            echo '❌ Deployment failed or Nginx setup encountered an error.'
            slackSend(color: 'danger', message: 'Deployment to production failed')
        }
    }
}