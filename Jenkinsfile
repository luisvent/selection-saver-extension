pipeline {
    agent {
        node {
            label 'agent1'
            }
      }
    triggers {
        pollSCM '*/5 * * * *'
    }
    stage('Deploy') {
        steps {
            echo 'Deliver....'
            bat """
            echo "doing delivery stuff.."
            cd api
            xcopy *.* "C:\\Sites\\ss_api" /s /e /y
            """
        }
    }
    stages {
        stage('Dependencies') {
            steps {
                echo "Building.."
                bat """
                cd "C:\\Sites\\ss_api"
                npm install
                """
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                bat """
                """
            }
        }

        stage('Running') {
            steps {
                echo "running.."
                bat """
                REM cd "C:\\Sites\\PersonalSiteApi"
                REM start node app.js
                REM call run.bat
                REM Exit with success code 0
                REM exit /b 0
                """
            }
        }
    }
    post {
        success {
          echo "running.."
          bat """
          REM cd "C:\\Sites\\PersonalSiteApi"
          REM node app.js
          REM call run.bat
          REM Exit with success code 0
          exit /b 0
          """
        }
      }
}
