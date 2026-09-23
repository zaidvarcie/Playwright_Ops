

const { test, expect } = require('@playwright/test');


// sign up user thrugh api call

// checkaccount status api

test("@signup Verify checkaccount status api", async ({ request }) => {

    let Token;
const checkAccountStatusResponse = await request.post(
    "https://quickdev1.super.one/writer/v4/user/checkAccountStatus",
    {
        headers: {
            "Content-Type": "application/json",
            "Device-Type": "web"
        },

        data: {
            recaptchaToken: "0cAFcWeA6ov5GBWj8RvA6g3oTKuBOjdNu0k8NG6qWzJ1dbGeDHadY5QsSu_9GNUDMmqwjJPgV-doD_LxsEYKAe1GD8CXaU8CSn4m2hJFetXFOPDlzcDZw8IdJKcd7h15fJa-khClpC0XTXQ4uk4D_ot3SWcP0dsKgPojsvyni-aJ6mY6WKLRAYHfmB5FA9gVRmraOm9zgisjlMuT6XqQvwenEjHMPCFEg3QtNYZ-44XAOPpDwGyBRmbEUwdU1uNxzUZRaM-MjPFrqzEEvjxNgNQdbbso6A2jvBB4ZbDCXWcbzXq92dFjnW4CgYWWyWFCqf7WQhUIlLCP0zWYtrLDcLzkY-0uDhKsTGnZKVA7fCAvpBLR7Rm9E_8ogujRGTdl1xqZGkBS-3xaAAr6OzG_uB3GarYCOtstHxS7C7jEzLEy9Pkk_PJZs2PvwNiL7bf2SaYMZKJVLVI5tB8Dt8LsPnk1DmOuFfJU6ye_CQ2irCvbXNyJXn4nw6ZF8e2VkVOSWk5FyxXiusdxlrZDJww8NkX_wxsd8M3YWF87nd-mDYzrjVR83OIV3Gd2AXdRSRg_FLCwf6mU3njOkqd-BeVLD-eq_RzIUFB1i9kL6aQKAYsUJTAzsXGk4afZmkf75aXqgHppb--vrBKk6cKsu96e2dWZBPvtpCZUzEPyn5606Fpbx5UCvedkrE4cYesZJ8ISX-Re0zP2B0GpEgJzWjeYrVMU6jj88Z_LsMXTn8pLAfBwAP5aSrBvljs-YbmOtaivyi8n-4xqs2Nh-OjLe5DHQp8WK-faUytQKvtr6CJZBAtXeB9pOnL6TpoMd_kOeDWSCbeLmTCN5RrOsi0Qs3K3gHfrj2ulIekv0JPmVuW8JuGlQh1Na_FqW1UEYQ9NwHVGhHr6BhuDa1QHv5WHIckmPKEb1HHxG00WyWZKmbRfDSPdKSKRiXnfHdj-7MvH9kw8Hlr0kavtQSoI2rj0V5YtVC-ESD3Dv1YtOscdRJxwjE-6HTomLs234454UxJ_Ohum4IlbjtIy7-bBM6JCvagFs_KZ6RdDXbaofGq8bn8ZPwnEflHEdgCNpuXi2gkvdFzj7r1Gubbi_gMNW8uzrIxS-pHFKw2GETQbzSPnUcIsHqHXEDvpI6PQvFMqcN3T3WC-rZ-ihde-iowVK3pDZ4DL78eqg5oZ18fvTFEKAhFW7UKLimIFXRtGm_JQ_miZ4hSclbyQebJAio4OHYB4G610hPK0h1wIGg5C1C1wevat15JLsLcvTjbOFGa8elJKNzo9yRHkjUL8RbqmzKmHBYelYUZsmUHAL1zQpHUhXuN6EUmbkUo1IExzEqn4OcXFw9FmFeRUhaTd6-pPSfp4aGzMdg8f5AUuWfl6yoS6hMYXpp7i08p4_lVOFyJSbB2wBGOfJjMnihJu0VtHFR",
            email: "heytest001@gmail.com",
            subscribeMarketing: true,
            deviceToken: null,
            pwaDevice: "Windows",
            countryName: "India",
            countryCode: "+91",
            lang: "en",
            deviceType: "WEB",
            referenceId: "",
            referralName: "VG2rtmKGDB"
        }
    })


  

    // Assertion on thestatus code
    expect(checkAccountStatusResponse.status()).toBe(200)

    const checkAccountStatusBody = await checkAccountStatusResponse.json()

    // lets have some assertions 

    expect(checkAccountStatusBody).toHaveProperty("message", "Success", "display", true, "data");
    //expect(checkAccountStatusBody.message).toBe("One-Time Password (OTP) sent to your registered email."),
        expect(checkAccountStatusBody.display).toBe(false),
        expect(checkAccountStatusBody.success).toBe(true)

        

    const verifyOtpResponse = await request.post("https://quickdev1.super.one/writer/user/verifyUserOtp",
        {
            headers: {
                "Content-Type": "application/json",
                "Device-Type": "web"
            },
            data: {
                email: "heytest001@gmail.com",
                otp: "123456",
            }
          })
            // Assertions 
            expect(verifyOtpResponse.status()).toBe(200)
            const verifyOtpBody = await verifyOtpResponse.json()
            expect(verifyOtpBody).toHaveProperty("message", "Success", "display", true, "data");
            expect(verifyOtpBody.message).toBe("OTP verified."),
                expect(verifyOtpBody.display).toBe(false),
                expect(verifyOtpBody.success).toBe(true)

                // Get the token from the response and use it for subsequent requests
                Token = verifyOtpBody.data.token;
                console.log("Token received: " + Token);

      


    const setPasswordResponse = await request.patch(
        "https://quickdev1.super.one/writer/v3/user/password/set",

        {
            headers: {
                "Content-Type": "application/json",
                "Device-Type": "web",
                "Token": Token

            },
            data: {
                password: "Test@123",
                referralName: "VG2rtmKGDB",
            }
        })
        
    

    // Assertion
    expect(setPasswordResponse.status()).toBe(200)
    const setPasswordBody = await setPasswordResponse.json()
    expect(setPasswordBody).toHaveProperty("message", "Success", "display", true, "data");
    expect(setPasswordBody.message).toBe("Password set."),
        expect(setPasswordBody.display).toBe(false),
        expect(setPasswordBody.success).toBe(true)

        // traverse the data object to get the userId and referralName
        expect(setPasswordBody.data.nextAction).toBe("SET_REFERRAL");



    const verifyUserResponse = await request.post("https://quickdev1.super.one/writer/v3/user/verifyReferral",
        {
            headers: {
                "Content-Type": "application/json",
                "Device-Type": "web",
                 "Token": Token
            },
            data:{
                email: "heytest001@gmail.com",
                referralCode: "VG2rtmKGDB"
            }
        
         })
        // Assertions
        expect(verifyUserResponse.status()).toBe(200)

        const verifyUserBody = await verifyUserResponse.json()
        expect(verifyUserBody).toHaveProperty("message", "Success", "display", true, "data")
        expect(verifyUserBody.message).toBe("User placed."),
        expect(verifyUserBody.display).toBe(false)

})
