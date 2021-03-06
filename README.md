### System configuration 

```
CPU: 4 cores
RAM: 8GB
```

### Test scenario

- Node server running on single core  vs server running on multi core in cluster mode
- 10000 requests with 100 concurrent users.


##

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
    -  ```bash
                [nodemon] starting `node app.js`
                Server 52796 is started at 3000
                Server 52789 is started at 3000
                Server 52803 is started at 3000
                Server 52790 is started at 3000
        ```       
- [x] Test the API  with 10000 requests and 100 concurrent users
    - [x] Report?
    - ### Run 1
        ```bash
            loadtest -n 10000 -c 100 http://localhost:3000
                 Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
                 Requests: 9217 (92%), requests per second: 1849, mean latency: 54.1 ms

                 Target URL:          http://localhost:3000
                 Max requests:        10000
                 Concurrency level:   100
                 Agent:               none

                 Completed requests:  10000
                 Total errors:        0
                 Total time:          5.342220699 s
                 Requests per second: 1872
                 Mean latency:        53 ms

                 Percentage of the requests served within a certain time
                   50%      50 ms
                   90%      74 ms
                   95%      80 ms
                   99%      99 ms
                  100%      118 ms (longest request)
        ```
    - ### Run 2
        ```bash
             loadtest -n 10000 -c 100 http://localhost:3000
                 Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
                 
                 Target URL:          http://localhost:3000
                 Max requests:        10000
                 Concurrency level:   100
                 Agent:               none
                 
                 Completed requests:  10000
                 Total errors:        0
                 Total time:          4.534954364 s
                 Requests per second: 2205
                 Mean latency:        45 ms
                 
                 Percentage of the requests served within a certain time
                   50%      42 ms
                   90%      65 ms
                   95%      71 ms
                   99%      82 ms
                  100%      106 ms (longest request)
            ```
- [x] Forcefully kill process and see if the server still cope with the faults - Fault tolerence
    - ```bash
        Worker 56301 died
        Server 56454 is started at 3000
        Worker 56307 died
        Server 56495 is started at 3000
        Worker 56309 died
        Server 56520 is started at 3000
        Worker 56315 died
     ```
- [x] Add a POST api which modifies a in-memory store
    - In-memory does not work, because all of these process will have different memory. 
- [ ] Load test again to see the values are properly being set and get


## Installation 

```
npm i
npm run start
```

## Report

> Surprise!



| Item         | Single Core | 4 Core     |
|--------------|-------------|------------|
| Run 1        | 4.93908521 s / 2025 / 48.9 ms / 72 ms            | 5.342220699 s / 1872 / 53 ms / 80 ms           |  
| Run 2        | 3.630118847 s / 2755 / 35.9 ms / 67 ms    | 4.534954364 s / 2205 / 45 ms / 71 ms       |

Data in each cell are in the following order

`Total time` / `Requests per second` / `Mean latency` / `95th percentile`

## Observations

> I was expecting system with all 4 cores used (cluster mode), will perform better than single core system but it did not happen. As you can see single core system took less time to execute 10000 requests with 1000 concurrent users than the cluster mode system. Also notice the mean latency in case of singel core is less than multi core system. 

> I am not sure why this happened. Need to understand it better. 

> However, multi core system clearly excels in case of fault tolerance which is good.

