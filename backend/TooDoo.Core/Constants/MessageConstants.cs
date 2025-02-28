namespace TooDoo.Core.Constants
{
    public static class MessageConstants
    {
        public static class InvalidUserMessages
        {
            public const string InvalidFirstName = "Invalid first name";
            public const string InvalidLastName = "Invalid last name";
            public const string InvalidEmail = "Invalid email";
            public const string InvalidUserName = "Invalid user name";
            public const string InvalidPassword = "Invalid password. Password must be at least {1} characters long {0}";

        }
        public static class UserMessages
        {
            public const string UserRegistered = "User registered successfully";
            public const string UserAlreadyExists = "User already exists";
            public const string UserNotFound = "User not found";
            public const string InvalidPassword = "Invalid password";
            public const string UserLoggedIn = "User logged in successfully";
            public const string UserLoggedOut = "User logged out successfully";
            public const string UserRefreshed = "User refreshed successfully";
            public const string UserNotAuthenticated = "User not authenticated";
            public const string UserNotAuthorized = "User not authorized";
        }
    }
}