# Installing PostgreSQL 


## Prerequisites

- macOS operating system
- Homebrew package manager

## Installation Steps

1. **Install Homebrew (if not already installed)**


   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install PostGreSQL**

    ```bash
    brew install postgresql@14
    ```

3. Start PostgreSQL

    ```bash
    brew services start postgresql@14

    ```

4. (Optional) Access PostGreSQL terminal

    ```bash
    psql -U postgres
    ```

    * For the first time run the following commands to create postgres user:

        ```bash
        createuser -s postgres
        ```
        ```bash
        brew services restart postgresql
        ```

5. Create library management database

    ```bash
    psql -U postgres db/ddl.sql
    ```

