import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { z } from 'zod'
import { db } from "@/lib/db"
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import { pusherServer } from "@/lib/pusher"
import { pusherKeyHelper } from "@/lib/utils"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email: emailToAdd } = addFriendValidator.parse(body.email)

        const session = await getServerSession(authOptions)
        if (!session) {
            return new Response('Unauthorized.', { status: 401 })
        }

        const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`) as string


        if (!idToAdd) {
            return new Response('This person does not exist.', { status: 400 })
        }


        if (idToAdd === session.user.id) {
            return new Response('You cannot add yourself as friend.', { status: 400 })
        }

        // Check if already added
        const isAlreadyAdded = await fetchRedis(
            'sismember',
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        ) as 0 | 1


        if (isAlreadyAdded) {
            return new Response('Already sent friend request.', { status: 400 })
        }

        // Check if already friend
        const isAlreadyFriend = await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
        ) as 0 | 1

        if (isAlreadyFriend) {
            return new Response('Already friends.', { status: 400 })
        }


        // Valid Request, Send Friend Request
        pusherServer.trigger(
            pusherKeyHelper(`user:${idToAdd}:incoming_friend_requests`),
            'incoming_friend_requests',
            {
                senderId: session.user.id,
                senderEmail: session.user.email
            }
        )

        db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

        return new Response('OK')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid response payload', { status: 422 })
        }

        return new Response('Invalid request', { status: 400 })

    }
}