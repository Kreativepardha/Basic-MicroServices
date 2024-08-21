const { z } = require("zod")

 const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10)
})


 const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

 const addressSchema = z.object({
    street: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
});


module.exports = {
    signInSchema,
    signupSchema,
    addressSchema
}