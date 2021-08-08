# React Coding Challenge

The 3 priorities that we provide you are:
  * 1 = error
  * 2 = warning
  * 3 = info

## How to run

1. npm install 

if it fails, try npm install --legacy-peer-deps

2. npm start

It listens localhost:3000

### Acceptance Criteria

1. Messages should be rendered in a table-like structure. The newest messages should appear at the top of their respective columns.
2. Provide test coverage of the components. 
3. Ensure UI Matches the image

### Note

1. The example design below.

![Example Design](./mock.png)


2. The messages should be color coded depending on the priority of the message. The appropriate color per priority is:

   * error: #F56236
   * warning: #FCE788
   * info: #88FCA3

3. Each time a message with the priority level of error is received, a snackbar containing the error message should also appear at the top of the application. The error should disappear in 2 seconds, when another error message takes its place, or when the user clears it via the provided button located in the error message.
4. A user should be able to clear all messages at any point.
5. A user should be able to clear a specific message in a specific column
6. A user should be able to start and stop incoming messages. By default the messages should be running and displaying on the grid. The start/stop button should update depending on the state of the feed.
7. A user should see a count of specific messages in each column
8. Use material-ui components and JSS styles. Preferrably styled-components
9. Test your application to the degree that you feel comfortable with. No specific testing frameworks are required.
10. Use functional components. If possible, change MessageList to functional component
11. Improve code structure. Your implementation should be more like how you do it for any production grade application development
