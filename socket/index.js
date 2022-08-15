import { Server } from "socket.io";

const io = new Server({ 
    // Setting cors allows socketIO server to be accessed only from the set host
    cors: {
        origin: "http://localhost:3000"
    }
 });



 // Online users + socketId
 let onlineUsers = [];
 let offlineUsers = []

 // Add user
 const addNewUser = (username, socketId)=>{
    !onlineUsers.some(user=>user.username === username) && onlineUsers.push({username, socketId})
 }

 // Add offline user
 const addOfflineUser = (senderName, receiverName, orderStatus, storename, datetime)=>{
    // !offlineUsers.some(user=>user.receiverName ===receiverName) && offlineUsers.push({receiverName, senderName, type})
    const data = [{senderName, receiverName, orderStatus, storename, datetime}]
    console.log('data::', data)
    // !offlineUsers.some(user=>user.receiverName ===receiverName) && offlineUsers.push({receiverName, data})
    // Update existing receiver record
    if (offlineUsers.find(user=>user.receiverName===receiverName) !== undefined) {
         const temp = offlineUsers.map(user =>{
            if (user.receiverName === receiverName) {
                user.data.push(data)
                return user 
            }
            return user
        });
        // console.log( temp ,offlineUsers === temp )
    }
    else {
        offlineUsers.push({receiverName, data})
    }
 }

 // Remove online user
 const removeOnlineUser = (socketId)=>{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
 }

 //Remove offline user
 const removeOfflineUser = (username)=>{
    offlineUsers = offlineUsers.filter(user => user.receiverName !== username);
 }

 // Get user online
 const getUserOnline = (username)=>{
    return onlineUsers.find(user=>user.username === username);
 }


 // Get user offline
 const getUserOffline = (username)=>{
    return offlineUsers.find(user=>user.receiverName === username);
 }


 // Resolve pending notifications
 const resolvePending = (socket, username)=>{
    const offlineUser = getUserOffline(username)
    console.log("offlineUser: ",offlineUser, offlineUsers)

    if (offlineUser !== undefined){
        io.to(socket.id).emit('getNotification', offlineUser);
      
        // Remove user from offline users
        removeOfflineUser(offlineUser.receiverName)
    }
 }


io.on("connection", (socket) => {
    console.log(socket.id)
    // Get event from client
    socket.on("newUser", (username)=>{
        // Call resolve pending
        resolvePending(socket, username)
  
        // Add online user
        addNewUser(username, socket.id);
    });

    socket.on('sendNotification', ({senderName, receiverName, orderStatus, storename, datetime})=>{
        console.log(receiverName, typeof receiverName)

        if (typeof receiverName === 'string' || Number.isInteger(receiverName) ) {
            const receiver = getUserOnline(parseInt(receiverName))
            console.log(receiver)
            if(receiver) {
                const data = [{senderName, receiverName, orderStatus, storename, datetime}]
                io.to(receiver.socketId).emit('getNotification', {
                    receiverName, data
                });
                console.log("emitted:  getNotification - string/int")
            }
            else {
                addOfflineUser(senderName, parseInt(receiverName), orderStatus, storename, datetime )
            }

        }
        else if (typeof receiverName === 'object' && receiverName.length === undefined ) {
            const receiver = getUserOnline(receiverName['id'])
            console.log(receiver, "++++++++++++++++object++++++++++++++++++++")

            if(receiver) {
                const data = [{senderName, receiverName, orderStatus, storename, datetime}]
                io.to(receiver.socketId).emit('getNotification', {
                    receiverName, data
                })
                console.log("emitted:  getNotification - object")
            }
            else {
                addOfflineUser(senderName, receiverName['id'], orderStatus, storename, datetime )
            }
        }

        else if ( Array.isArray(receiverName)) {

            receiverName.forEach(item=>{
                const receiver = getUserOnline(item['id'])
                if(receiver) {
                    const data = [{senderName, receiverName, orderStatus, storename, datetime}]
                    io.to(receiver.socketId).emit('getNotification', {
                        receiverName, data
                    });
                    console.log("emitted:  getNotification array")
                }
                else {
                    addOfflineUser(senderName, item['id'], orderStatus, storename, datetime )
                    console.log(item['id'])
                }
            });
        }
 

    });

    socket.on('disconnect', ()=>{
        removeOnlineUser(socket.id);
        console.log("socket disconnected ...", socket.id)
    });
});

io.listen(5001);



