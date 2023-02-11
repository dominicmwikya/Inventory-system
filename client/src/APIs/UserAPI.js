import React from 'react';
export const UserAPI={
    create:async function(){
        const response= axios.post();
        return response;
    },
    edit:async function(id){
        const response= axios.get();
        return response;
    },
    delete:async function(id){
        const response= axios.delete();
        return response;
    },
    update:async function(){
        const response= axios.put();
        return response;
    }
}