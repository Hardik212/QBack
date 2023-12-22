import { Database, connectToDB } from "@/database";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
    ) {
    const User = await connectToDB({ dbName: Database.user });
    const user = await User?.findById(params.id);
    return new Response(JSON.stringify(user));
}
