Code	Status	                     When to Use	                  Example
200	OK	                   Request successful	               User data fetched successfully
201	Created               	   New resource created	               User registration successful
400	Bad Request	           Invalid request from client	       Missing required fields
204	No Content	           Success but no data returned	       User deleted successfully
401	Unauthorized	           User not authenticated	       No JWT token provided
403	Forbidden	           User authenticated but not allowed  Normal user accessing admin route
404	Not Found	           Resource doesn't exist	       User ID not found
409	Conflict	           Duplicate resource exists	       Email already registered
422	Unprocessable Entity	   Validation failed	               Invalid email format
429	Too Many Requests	   Rate limit exceeded	               Too many login attempts
500	Internal Server Error	   Server-side error	               Database connection failed
502	Bad Gateway	Invalid    response from another server	       API gateway error
503	Service Unavailable	   Server temporarily unavailable      Maintenance mode




backend: https://e-commerce-mern-0lq5.onrender.com/

frontend:https://mvstore-beta.vercel.app/
