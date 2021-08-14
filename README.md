# Back-End

This is the backend code for our Use-My-Tech-Stuff student project.  Below is the endpoint documentation



Endpoint Documentation:

BASE URL: https://back-end-tt.herokuapp.com/




axios.get("/") </br>
returns json object {api: "up"}</br>
</br>
</br>

axios.post("/api/users/register") </br>
requires a user object = { </br>
    username: "must be unique", </br>
    password: "must be a string", </br>
    user_type: "must be renter, owner, or both. defaults to renter if not specified" </br>
}</br>
returns the newly created user</br>
</br>
</br>

axios.post("/api/users/login")</br>
requires a user object = {</br>
    username: "username here",</br>
    password: "password here"</br>
}</br>
returns user and token.  You will want to save user_id to state.</br>
</br>
</br>

axios.get("/api/equipment/")</br>
returns array filled with all equipment on site.</br>
</br>
</br>

axios.get("/api/equipment/owner/:id")</br>
returns all equipment attached to a specific owner's ID</br>
</br>
</br>

axios.get("/api/equipment/renter/:id")</br>
returns all equipment attached to a specific renter's ID</br>
</br>
</br>

// URL ID WILL BE OWNERS_ID</br>
axios.post("/api/equipment/createEquipment/:id")</br>
requires an equipment object = {</br>
    equipment_name: "equipment name required",</br>
    equipment_description: "description not required"</br>
}</br>
url id will be passed in as owner_id</br>
renter_id will be set to null</br>
returns string: 'successfully created new equipment'</br>
</br>
</br>

//MAKE SURE URL ID IS EQUIPMENT ID, NOT USER ID</br>
axios.delete("/api/equipment/deleteEquipment/:id")</br>
url id will be passed in as equipment id</br>
will delete said equipment</br>
returns "equipment deleted successfully"</br>
</br>
</br>


// URL ID WILL BE RENTERS_ID</br>
axios.put("/api/equipment/rentEquipment/:id")</br>
    requires an equipment object = {</br>
        equipment_id = "equipment id here",</br>
        equipment_name = "equipment name here",</br>
        equipment_description = "equipment description here",</br>
        owner_id = "owner id here",</br>
        renter_id = "renter id here"</br>
    }</br>
if renter_id IS NOT null, put request will be rejected</br>
if renter_id IS null,  url id will be passed in as new renter's id</br>
if update is successful, will return string "update successful"</br>
</br>
</br>

// URL ID WILL BE EQUIPMENT ID</br>
axios.put("/api/equipment/returnEquipment/:id")</br>
    requires an equipment object = {</br>
        equipment_id = "equipment id here",</br>
        equipment_name = "equipment name here",</br>
        equipment_description = "equipment description here",</br>
        owner_id = "owner id here",</br>
        renter_id = "renter id here"</br>
    }</br>
renter_id will be turned to null and will return string "equipment returned"</br>
