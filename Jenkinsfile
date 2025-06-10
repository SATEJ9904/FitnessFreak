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

        stage('Deploy to Web Server') {
            steps {
                echo 'Deploying build to web server directory...'
                sh '''
            sudo rm -rf /var/www/html/fitnessfreak/*
            sudo cp -r build/* /var/www/html/fitnessfreak/
        '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
