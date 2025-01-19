import config from "../config"

type UserAuthType = {
    email: String;
    password: String;
}

type UserType = {
    email: String,
    name: String,
    password: String
}

type TagType = {
    name: String
}

type TaskType = {
    title: String
}

export default {
    tag: {
        create(obj: TagType){
            return fetch(`${config.host}/tag`, {
                method: 'POST',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj)
            });
        },
        findAll(){
            return fetch(`${config.host}/tag`, {
                method: 'GET',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        },
        update(id: number, obj: TagType){
            return fetch(`${config.host}/tag/${id}`, {
                method: 'PUT',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj)
            });
        },
        destroy(id: number){
            return fetch(`${config.host}/tag/${id}`, {
                method: 'DELETE',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        }
    },
    task: {
        findAll(obj = {}){
            return fetch(`${config.host}/task?` + new URLSearchParams({
                currentPage: (obj as any).currentPage || 1,
                id: (obj as any).id || "",
                title: (obj as any).title || "",
                description: (obj as any).description || "",
                tagId: (obj as any).tagId || ""
            } as any).toString(), {
                method: 'GET',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        },
        create(obj: TagType){
            return fetch(`${config.host}/task`, {
                method: 'POST',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj)
            });
        },
        update(id: number, obj: TaskType){
            return fetch(`${config.host}/task/${id}`, {
                method: 'PUT',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj)
            });
        },
        destroy(id: number){
            return fetch(`${config.host}/task/${id}`, {
                method: 'DELETE',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        }
    },
    user: {
        create(obj: UserType){
            return fetch(`${config.host}/user`, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
        },
        auth({ email, password }: UserAuthType){
            return fetch(`${config.host}/user/auth`, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
        },
        logout(){
            return fetch(`${config.host}/user/logout`, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        }
    }
}