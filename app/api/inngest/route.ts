import { inngest } from "@/lib/client"
import { sendSignUpEmail } from "@/lib/client/function"
import { serve } from "inngest/next"

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail],
})