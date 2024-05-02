pub mod index {

    pub fn action_index() -> &'static str {
        super::demo::add_to_waitlist()
    }
}

pub mod site {}

pub mod demo {
    pub fn add_to_waitlist() -> &'static str {
        super::dao::demo::create_wait()
    }
}

pub mod demo2 {}

mod dao {
    pub mod demo {
        pub fn create_wait() -> &'static str {
            "create_wait"
        }
    }
}
