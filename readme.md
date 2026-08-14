# ThinkTweet - An AI Argumentator/Analyzer

## What is ThinkTweet?
ThinkTweet is a project whose job is to analyze a claim of X's platform and estimate how reliable the claim is. ThinkTweet tries to improve the talking discourse and avoiding any pseudoscience, misogny, hatred against minotory groups and holding the authority's accountablity

> Currently, this project limited to feminism related topics. Period.

## Why I built this?
I am Indian, and I saw clear problem that people are tweeting anything without checking their biasness or googling it look for data. It felt like people are in their own bubble. And the audacity to label someone just to discredit. This toxicity entered into human rights issues also, and during the same time I was thinking to build some project related to woman safety or feminism related. And honestly, I was unable to think about any unique issue to solve. At the end I chose, to analyze the claim of twitter and restrict it to feminism related for better feminist discourse. We are gonna expand the domain later on.

## Project Structure
![Project_Structure](./docs/diagrams/project_structure.png)

## Engineering Overview
### Analysis
- #### Architecture

```mermaid
flowchart LR

    User["User"]

    subgraph Client["Client"]
        Frontend["React Frontend"]
        Validation["Client-side Validation"]
    end

    subgraph Server["Backend"]
        API["Express API"]
        Security["Security & Validation Layer"]
        Controller["Controllers"]
        Services["Analysis Services"]
    end

    Database[("MongoDB")]

    subgraph External["External Services"]
        X["X / Twitter API"]
        AI["AI / LLM Providers"]
    end

    User --> Frontend
    Frontend --> Validation
    Validation --> API

    API --> Security
    Security --> Controller
    Controller --> Services

    Services --> Database
    Services --> X
    Services --> AI

    Controller --> Database
    Controller --> Frontend
```

```mermaid
flowchart TD

    A["User submits X URL"]
    B["Frontend validation"]

    C["Express API"]
    D["Rate Limiter"]
    E["Authentication"]
    F["Security & Request Validation"]

    G{"Tweet already exists?"}
    H["Query MongoDB"]
    I["Call X / Twitter API"]

    J["Save retrieved tweet"]
    K["Domain Classification"]
    L{"Tweet is about feminism?"}

    M["Reject request"]
    N["Analysis Controller"]

    O{"Already analyzed?"}
    P["Return existing analysis"]

    Q["Analysis Services"]
    R["LLM Analysis"]
    S["Calculate final result"]
    T["Save analysis"]

    U["Deduct user credit"]
    V["Update analysis count"]
    W["Return response"]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F

    F --> G

    G -->|Yes| H
    G -->|No| I

    I --> J
    H --> K
    J --> K

    K --> L

    L -->|No| M
    L -->|Yes| N

    N --> O

    O -->|Yes| P
    O -->|No| Q

    Q --> R
    R --> S
    S --> T

    T --> U
    U --> V
    V --> W

    P --> W
```