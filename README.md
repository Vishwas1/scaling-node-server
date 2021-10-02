To learn how to scale a system

- [x] Create a simple GET API in  local server
- [x] Create a simple express server with single core
- [x] Test the API  with 10000 requests and 100 concurrent users
    - [x] Report?
    - ### Run 1
        ```bash
            hypermine@hermit-laptop:~$ loadtest -n 10000 -c 100 http://localhost:3000
                Requests: 0 (0%), requests per second: 0, mean latency: 0 ms

                Target URL:          http://localhost:3000
                Max requests:        10000
                Concurrency level:   100
                Agent:               none

                Completed requests:  10000
                Total errors:        0
                Total time:          4.93908521 s
                Requests per second: 2025
                Mean latency:        48.9 ms

                Percentage of the requests served within a certain time
                50%      46 ms
                90%      63 ms
                95%      72 ms
                99%      84 ms
                100%      126 ms (longest request)
        ```
    - ### Run 2
        ```bash
            hypermine@hermit-laptop:~$ loadtest -n 10000 -c 100 http://localhost:3000
                Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
                
                Target URL:          http://localhost:3000
                Max requests:        10000
                Concurrency level:   100
                Agent:               none
                
                Completed requests:  10000
                Total errors:        0
                Total time:          3.630118847 s
                Requests per second: 2755
                Mean latency:        35.9 ms
                
                Percentage of the requests served within a certain time
                50%      30 ms
                90%      58 ms
                95%      67 ms
                99%      79 ms
                100%     94 ms (longest request)
        ```
- [x] Update the server to run in cluster with all 4 core
    - 
        ```bash
                [nodemon] starting `node app.js`
                Server 52796 is started at 3000
                Server 52789 is started at 3000
                Server 52803 is started at 3000
                Server 52790 is started at 3000
        ```
- [ ] Test the API  with 10000 requests and 100 concurrent users
    - [ ] Report?
- [ ] Add a POST api which modifies a in-memory store
- [ ] Load test again to see the values are properly being set and get


## Installation 

```
npm i
npm run start
```