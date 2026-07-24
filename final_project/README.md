This is the course final assignment for<br>
IBM - Developing Back-End Apps with Node.js and Express on Coursera<br>
https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express

setup:
fork the original one to personal github, and then clone it to personal working env

cd project directory with entry js<br>
npm install --save<br>
npm start<br>
for part 10 and later, it requires to use axios<br>
npm install axios<br>

following command is for AI grading

1. curl -s https://api.github.com/repos/michaellau410/expressBookReviews | jq '.parent.full_name'
2. curl http://localhost:5000/ (default type is GET, and for this , -X can be omitted)
3. curl http://localhost:5000/isbn/1
4. curl http://localhost:5000/author/unknown
5. curl http://localhost:5000/title/Things%20Fall%20Apart
6. curl http://localhost:5000/review/4
7. curl -X POST -H "Content-Type: application/json" -d '{"username":"John", "password":"12345"}' http://localhost:5000/register
8. curl -X POST -H "Content-Type: application/json" -d '{"username":"John", "password":"12345"}' -c cookies.txt http://localhost:5000/customer/login
9. curl -X PUT -H "Content-Type: application/json" -d '{"comment":"this is review"}' -b cookies.txt http://localhost:5000/customer/auth/review/1
10. curl -X DELETE -b cookies.txt http://localhost:5000/customer/auth/review/1
11. copy the general.js code

for 8 and 9
-c cookies.txt and -b cookies is needed as the session by default does not exist




