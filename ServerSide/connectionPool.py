import queue
import sqlite3
from contextlib import contextmanager


class ConnectionPool:
    def __init__(self, max_connections, database):
        self.max_connections = max_connections
        self.database = database
        self.pool = queue.Queue(maxsize=max_connections)

        for _ in range(max_connections):
            conn = self.create_connection()
            self.pool.put(conn)

    def create_connection(self):
        return sqlite3.connect(self.database)

    def get_connection(self, timeout):
        try:
            return self.pool.get(timeout=timeout)
        except queue.Empty:
            raise RuntimeError("Timeout: No available pool in the pool.")

    def release_connection(self, conn):
        self.pool.put(conn)

    @contextmanager
    def connection(self, timeout=10):
        conn = self.get_connection(timeout)
        try:
            yield conn
        finally:
            self.release_connection(conn)


if __name__ == "__main__":
    pool = ConnectionPool(5, 'test.db')

    with pool.connection() as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT 1')
        result = cursor.fetchall()
        print(result)