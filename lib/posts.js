import graphqlRequest from './graphqlRequest';

export async function getPostList(endCursor = null, taxonomy = null) {
    let condition = `after: "${ endCursor }", first: 3, where: {orderby: {field: DATE, order: DESC}}`;

    if (taxonomy) {
        condition = `after: "${ endCursor }", first: 3, where: {orderby: {field: DATE, order: DESC}, ${ taxonomy.key } : "${ taxonomy.value }"}`;
    }

    const query = {
        query: `query getAllPosts {
            posts(${ condition }) {
                nodes {
                title
                date
                slug
                excerpt(format: RENDERED)
                featuredImage {
                    node {
                        mediaDetails {
                            file
                            sizes {
                                sourceUrl
                                width
                                height
                            }
                        }
                    }
                }
                author {
                    cursor
                    node {
                        name
                        slug
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
        }`
    };

    const resJson = await graphqlRequest(query);
    const allPosts = resJson.data.posts;
    return allPosts;
}

export async function allCategory(){
    const query = {
        query: `query allCategory {
            categories {
                nodes {
                    name
                    slug
                    id
                }
            }
        }`
    };

    const resJson = await graphqlRequest(query);
    const allCategories = resJson.data.categories;
    return allCategories;
}

export async function getSinglePost(slug) {
    const query = {
        query: `query getSinglePost {
            post(id: "${ slug }", idType: SLUG) {
                date
                excerpt(format: RENDERED)
                content(format: RENDERED)
                modified
                slug
                title(format: RENDERED)
                databaseId
                featuredImage {
                    node {
                        mediaDetails {
                            sizes {
                                height
                                sourceUrl
                                width
                            }
                        }
                    }
                }
                author {
                    node {
                        name
                        slug
                    }
                }
            }
            categories {
                nodes {
                    name
                    slug
                }
            }
        }`
    };

    const resJson = await graphqlRequest(query);
    const singlePost = resJson.data.post;
    return singlePost;
}

export async function getPostSlugs() {
    const query = {
        query: `query getPostSlugs {
            posts {
              nodes {
                slug
              }
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    const slugs = resJson.data.posts.nodes;
    return slugs;
}

export async function getCategorySlugs() {
    const query = {
        query: `query getCategorySlugs {
            categories {
              nodes {
                slug
              }
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    const categories = resJson.data.categories.nodes;
    return categories;
}

export async function getCategoryDetails(categoryName) {
    const query = {
        query: `query getCategoryDetails {
            category(id: "${ categoryName }", idType: SLUG) {
                count
                name
                slug
                description
            }
        }`
    };

    const resJson = await graphqlRequest(query);
    const categoryDetails = resJson.data.category;
    return categoryDetails;
}