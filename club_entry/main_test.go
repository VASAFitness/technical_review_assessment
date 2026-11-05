package main_test

import (
	"os/exec"
	"testing"
)

// TestDemo checks the starter's behavior by running the complete program.
func TestDemo(t *testing.T) {
	output, err := exec.Command("go", "run", ".").CombinedOutput()
	if err != nil {
		t.Fatalf("run demo: %v\n%s", err, output)
	}

	want := "Scanning active-001\n" +
		"[turnstile:front-desk] unlocked\n" +
		"Entry allowed: true\n\n" +
		"Scanning inactive-001\n" +
		"[turnstile:front-desk] locked\n" +
		"Entry allowed: false\n\n" +
		"Scanning active-002\n" +
		"[turnstile:front-desk] unlocked\n" +
		"Entry allowed: true\n\n" +
		"Scanning unknown-001\n" +
		"[turnstile:front-desk] locked\n" +
		"Entry allowed: false\n\n"
	if string(output) != want {
		t.Fatalf("demo output:\ngot:\n%s\nwant:\n%s", output, want)
	}
}
