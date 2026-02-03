---
layout: post
title: "Your Data Stack Is Not Behind"
date: 2026-02-03
categories: [data, work]
excerpt: "Everyone has legacy. Cost constraints, skill gaps, budget limits. We always think someone else figured it out. No one did."
header_image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1600&q=80"
header_image_alt: "Abstract blue geometric layers representing data architecture"
header_image_credit: "Shubham Dhage"
header_image_credit_url: "https://unsplash.com/@theshubhamdhage"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
---

Data FOMO is getting worse. Every week, a new framework, a new reference architecture, an AI agent that will change everything. On social networks, perfect diagrams. At conferences, clean stacks, documented, scalable.

It's pure marketing.

Everyone has legacy. Cost constraints, skill gaps, budget limits. The "by the book" approach changes every six months, and it's accelerating with AI. We always think someone else figured it out. No one did.

At the core, we all have roughly the same setup: a warehouse, data in/out, an analytics layer. AI agents and ML in production? A minority of companies. Let's stop pretending otherwise.

Here's seven years of evolution at [Jolimoi](https://www.jolimoi.com). Pivots, hacks, mistakes. Not an architecture to admire. A path to own.

## 2017-2019: Quick and Dirty

Like everyone else, we started by querying production directly and running our analyses in Google Sheets.

Then we plugged Metabase straight into prod, eventually building up to 50 models by factorizing recurring joins. A DIY semantic layer before it was cool.

No one called it technical debt. We called it moving forward.

## 2020-2021: Prod Suffers

At some point, growth explodes. Analytical queries start eating up database resources and customers pay the price.

Timeouts appear, bottlenecks become impossible to trace.

We were building a DRP at the time, with a read replica. Instead of letting the cluster underused, we plugged Metabase on it and prod breathed again. Two birds, one stone.

Lasts one year.

## 2022: The Limits

But the problem wasn't volume, it was models. Metabase queries kept growing with more joins, more complexity.

We added a read-write cluster on top with minimal effort: a config change, a new schema for cache tables, and updated credentials. Existing queries remained untouched, and we drastically reduced refresh rate and sync risks for business users.

Then came our Series A. We decided to build a real lakehouse and picked Databricks over Snowflake for its flexibility and cost structure. Databricks was available on AWS Frankfurt, not Paris, so our earlier DRP choice paid off.

## 2023: Building the Foundation

Databricks implementation starts. We set up CDC from the read replica to S3 and used auto-loader to ingest the data. dbt and Airflow were deployed from day one, with Bronze, Silver, Gold layers.

Just one problem remained: Metabase had no official Databricks driver. The community driver worked at first, then the maintainer stopped updating it. We patched it manually for a while, then got tired of it.

We chose a temporary workaround by syncing the Gold layer to a PostgreSQL since the SQL syntax was close enough to Databricks. Not ideal, but functional while waiting for the official driver.

Six months in, devs ditched their cron jobs for Airflow and the data platform started pulling the entire tech org upward.

In addition we started to deploy Airbyte... 

## 2024: The Maturity

Then the official Databricks driver finally landed. We set a clear rule that official dashboards would only point to certified models running on Databricks, query times dropped by a factor of 100.

We also designed a Metric Tree. The idea was to take all the metrics scattered across Metabase and recentralize them in Databricks. Not yet and Semantic layer but a bold move. We got the conviction that the SL could lived on BI side.

On infrastructure side, some Airbyte and Airflow discontinued their docker-compose support. We decide to migrate everything from ec2/compose to k8/helm. 

## 2025-2026: The Platform Disappears 

Models and main dashboards migration is complete. Of the original 50 Metabase models, none survived. We just kept direct access to production for the devs/product team only.

We ditch Airbyte, too tired by the limited support and drivers available. Same for some python notebooks and then we replaced both by Census and Fivetran.

Finally we deployed a semantic layer on top of our certified models using Databricks Metric viewd. The Metric Tree had already done the hard work of defining business concepts, so this was mostly a technical step. 

We then plugged Databricks Genie on top of it. Now, anyone can ask a question in plain language and get an answer. No SQL, no joins to understand.

The platform becomes invisible, and that's exactly the point.

We're now consolidating everything into a single Databricks repo everything is managed using Claude Code. 

And the story continue... 