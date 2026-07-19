export const customFetch = async (routeName, bodyObject) =>{
    try {
      //talking to the server
      const response = await fetch(`http://localhost:3000/${routeName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyObject ?? {}), //study a bit more about "??"
      });

      //getting the response
      const data = await response.json();

      return data;
    } catch (error) {
      return error
    }
}