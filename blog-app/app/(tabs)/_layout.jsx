import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{headerShown: false, title: "Home", tabBarIcon: ()=> <Feather name="home" size={24} />}}/>
            <Tabs.Screen name="create-post" options={{headerShown: false, title:"Create Post", tabBarIcon: ()=> <Feather name="plus" size={24} />}}/>
        </Tabs>
    )
}