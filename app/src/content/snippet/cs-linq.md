---
title: Linq
category: C Sharp
description: Various linq queries
publishedDate: '2024-09-04'
---

Sorting a list from another list IDs

```cs
docs = docs.OrderBy(d => docsIds.IndexOf(d.Id)).ToList();
```