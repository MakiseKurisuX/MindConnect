import { Text, View, TextInput, Button, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
    let name = "Alice";

    const handlePress = () => {
        console.log("Im presseed");
    };

    function handlePress2() {
        console.log("Meoew");
    }

    return (
        <View>
            <Header />
            <Filter />
            <BusStops />
            <NavigationTab />
        </View>
    );dasdsadasdasda
}

const Header = () => {
    return (
        <View className=" bg-blue-500">
            <Text className="text-white text-xl font-bold">Bus Stops</Text>
        </View>
    );
};

const Filter = () => {
    return (
        <View className="flex justify-between flex-row px-3 py-1">
            <TextInput className="border-2 rounded-2xl w-4/5 p-2" placeholder="Select Bus Stops or Buildings" />
            <Button title="Filter" />
        </View>
    );
};

const BusStops = () => {
    const busStops = [
        { name: "University Town", shortName: "UTown", distance: 190 },
        { name: "Central Library", shortName: "CL", distance: 200 },
        { name: "Arts", shortName: "Arts", distance: 300 },
        { name: "Engineering", shortName: "Eng", distance: 400 },
        { name: "Science", shortName: "Sci", distance: 500 },
    ];

    return (
        <View>
            {busStops.map((busStop) => (
                <BusStop
                    key={busStop.shortName}
                    name={busStop.name}
                    shortName={busStop.shortName}
                    distance={busStop.distance}
                />
            ))}
        </View>
    );
};

type BusStopProps = {
    name: string;
    shortName: string;
    distance: number;
};

const BusStop = ({ name, shortName, distance }: BusStopProps) => {
    return (
        <View className="flex flex-row">
            <Button title="Fav" />
            <View>
                <View className="flex flex-row">
                    <Text>{name}</Text>
                    <Text>{distance}</Text>
                </View>
                <Text>Short Name</Text>
            </View>
            <Button title="Refresh" />
        </View>
    );
};
const NavigationTab = () => {
    return (
        <View>
            <Text>NavigationTab</Text>
        </View>
    );
};