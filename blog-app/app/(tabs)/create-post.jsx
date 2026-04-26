import { View, Text, TextInput } from "react-native"

export default function CreatePost() {
    return (
        <View className="px-5">
            <Text className="text-2xl mt-10 mb-5 py-4">Creer Un Post</Text>
            <View className="mb-4">
                <Text className="mb-2">Titre</Text>
                <TextInput className="py-4 rounded-xl border border-black" placeholder="Titre du post"/>
            </View>
            <View>
                <Text className="mb-2">Contenu</Text>
                <TextInput className="py-4 rounded-xl border  border-black" placeholder="Contenu du post" multiline={true} numberOfLines={10}/>
            </View>
        </View>
    )
}