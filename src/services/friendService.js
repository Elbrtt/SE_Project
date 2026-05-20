// Friend data service
const friends = [
    {
        id: 'friend-1',
        name: 'Alex Johnson',
        status: 'Online',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    {
        id: 'friend-2',
        name: 'Sarah Williams',
        status: 'In-Game',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
        id: 'friend-3',
        name: 'Michael Chen',
        status: 'Offline',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    }
];

window.friendService = {
    getAllFriends: () => friends
};