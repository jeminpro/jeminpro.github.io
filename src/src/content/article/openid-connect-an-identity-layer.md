---
title: OpenID Connect an identity layer
description: OpenId Connect is an identity protocol that allows users to sign into multiple websites with a single account. It is an Identity layer on top of OAuth 2.0 specification and its API friendly using REST and JSON message flow.
publishedDate: 2019-02-03
category: Architect
---

OpenId Connect is an identity protocol that allows users to sign into multiple websites with a single account. It is an Identity layer on top of OAuth 2.0 specification and its API friendly using REST and JSON message flow.

This would simplify the registration process and user wouldn’t need to remember multiple credentials. There are many websites that use OpenId Connect standards, for example, signing into (stack overflow)[https://stackoverflow.com/] using google account.

The core part of OpenId is to provide an **identity** of an **entity**. Lets clear out these terms.

An entity can be anything that is a person or a machine. In order to identify the entity, we use attributes such as name, age, address height, role etc. We want to express these identities depending on who we are talking to such as friend, family, office etc. Therefore an entity can have multiple identities, so we pick and choose which identities we choose to depend on context. Similar to this an identity layer is used to pick and choose which identity we want to share for different websites.

## Overview of OpenId Connect

![OpenId connect workflow](/images/post/2016/Open-Id-worklow.png)

In a typical OpenId workflow, consider user has landed on a web site that requires an authenticated account, then the server sends HTTP status code 302 redirect to the identity provider URL.

The client enters there user name and password into the identity provider system. If the credentials are valid the user confirms what identity information to be shared, it redirects back to clients app redirect URL with an authorization code.

The server requests token to the identity provider token endpoint passing authorization code which intern returns ID and Access Token. The ID Token is a signed [JWT](https://jwt.io/introduction/) containing basic claims. The Access Token can be used to access further User claims at the user info endpoint. The server optionally uses the access token to request additional claims from the user info endpoint

Server validates the ID token and retrieves user’s identity, the server could implement to save the token into the client browser as a cookie which could be used in the further calls to the server for identifying the user.

## Advantages

- Its very simple to implement as it uses JSON messages
- It is implemented in REST API and therefore Mobile and APP friendly
- Highly secure
- It is flexible
- It is interoperable i.e. once we connected to one provider its easy to add multiple providers

## How to implement

There are two sides to OpenId Connect i.e. provider and client. The certified libraries for the OpenId Connect implementation can be found in [Certified OpenID Connect Implementations](https://openid.net/developers/certified/) it has an implementation in most programming languages.