
## Adding delay

All responses can be delayed aggregating *delay* attribute into json request match. Value must be in milliseconds and greater than 0.

Request that respond in 1500 milliseconds or 1,5 seconds.
```json
{
  "request": {
     "..."
  },
  "delay" : 1500
}
```