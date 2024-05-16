import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export default function Page() {
    return (
      <View>
        <Link href="/login">LOGIN FROM HERE BABY</Link>
        <Text>Hello from here haha</Text>
      </View>
    );
  }