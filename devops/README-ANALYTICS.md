## Analytics

## Overview

Access logs for the frontend web app are from the Cloudfront distribution which logs to:

- s3://dev-app.rudijs.com.analytics/cloudfront-logs

AWS Athena is setup to read compressed logs from there.

Output from Athena operations and queries is in:

- s3://dev-app.rudijs.com.analytics/athena

## Setup

Create a workgroup:

- `aws athena create-work-group --name dev-app-rudijs-com --configuration ResultConfiguration={OutputLocation=s3://dev-app.rudijs.com.analytics/athena/}`

Create a database:

- `aws athena start-query-execution --query-string "CREATE DATABASE IF NOT EXISTS rudijscom COMMENT 'Site rudijs.com data aggregates' LOCATION 's3://dev-app.rudijs.com.analytics/athena' WITH DBPROPERTIES ('creator'='Rudi Starcevic', 'Dept.'='Web App Analytics')" --result-configuration "OutputLocation=s3://dev-app.rudijs.com.analytics/athena"`

Create a table for the parsed logs:

```
aws athena create-named-query --name "Create table cloudfront_logs" --description "Table for cloudfront distribution logs" --database rudijscom --work-group dev-app-rudijs-com --query-string "
CREATE EXTERNAL TABLE IF NOT EXISTS rudijscom.cloudfront_logs (
date DATE,
time STRING,
location STRING,
bytes BIGINT,
request_ip STRING,
method STRING,
host STRING,
uri STRING,
status INT,
referrer STRING,
user_agent STRING,
query_string STRING,
cookie STRING,
result_type STRING,
request_id STRING,
host_header STRING,
request_protocol STRING,
request_bytes BIGINT,
time_taken FLOAT,
xforwarded_for STRING,
ssl_protocol STRING,
ssl_cipher STRING,
response_result_type STRING,
http_version STRING,
fle_status STRING,
fle_encrypted_fields INT,
c_port INT,
time_to_first_byte FLOAT,
x_edge_detailed_result_type STRING,
sc_content_type STRING,
sc_content_len BIGINT,
sc_range_start BIGINT,
sc_range_end BIGINT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LOCATION 's3://dev-app.rudijs.com.analytics/cloudfront-logs/'
TBLPROPERTIES ( 'skip.header.line.count'='2' )"
```

## Adhoc queries to generate results:

```
SELECT distinct request_ip
FROM cloudfront_logs
where request_ip IS NOT NULL
```

## Delete and clean up

- Delete the tables and schema
- `aws athena start-query-execution --query-string "DROP SCHEMA IF EXISTS rudijscom CASCADE;" --result-configuration "OutputLocation=s3://dev-app.rudijs.com.analytics/athena"`
- Delete the work groups and saved queries
- `aws athena delete-work-group --recursive-delete-option --work-group dev-app-rudijs-com`
