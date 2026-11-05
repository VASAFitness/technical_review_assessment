package turnstile

import "fmt"

// Turnstile simulates the entrance hardware.
type Turnstile struct {
	Name string
}

func (t *Turnstile) Unlock() {
	fmt.Printf("[turnstile:%s] unlocked\n", t.Name)
}

func (t *Turnstile) Lock() {
	fmt.Printf("[turnstile:%s] locked\n", t.Name)
}
