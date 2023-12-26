"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm } from "react-hook-form"
import * as z from "zod"
import { ChangeEvent, useState ,useEffect} from "react";
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Input } from "@/components/ui/input"

const loginFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(30, {
      message: "name must not be longer than 30 characters.",
    }),
  password: z
    .string({
      required_error: "Please enter your password.",
    })
    .min(6,{
      message: "password must be at least 6 characters.",
    })

})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const router = useRouter();
   const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues:{
      name:'',
      password:''
    },
    mode: "onChange",
  })
  useEffect(() => {
    // Prefetch the dashboard page

  }, [router])

  async function onSubmit(data: LoginFormValues) {
    try {

      setLoading(true);

      await signIn("credentials", {
        redirect: true,
        name: data.name,
        password: data.password,
        callbackUrl: `${window.location.origin}`,
      });
      setLoading(false);

    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: JSON.stringify(error),
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
       setLoading(false);
    }


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="focus-visible:muted-foreground flex w-full justify-center rounded-md bg-foreground px-3 py-1.5 text-sm font-semibold  leading-6 shadow-sm hover:bg-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          {loading? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :null}
          {loading?'Please wait' : 'Sign In'}

          </Button>
      </form>
    </Form>
  )
}
