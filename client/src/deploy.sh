echo "Switching to branch master"
git checkout master

echo "building app..."
npm run building
echo "Deploying files to server..."
scp -r build/* chris@ec2-18-119-136-48.us-east-2.compute.amazonaws.com:/var/www/demo.digitalimpactnow.com/

echo "Done!"