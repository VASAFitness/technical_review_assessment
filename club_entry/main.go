package main

import (
	"fmt"

	"github.com/VASAFitness/technical_review_assessment/club_entry/access"
	"github.com/VASAFitness/technical_review_assessment/club_entry/turnstile"
)

func main() {
	device := &turnstile.Turnstile{Name: "front-desk"}
	scanner := access.NewKeyFobScanner(device)

	for _, fob := range []string{"active-001", "inactive-001", "active-002", "unknown-001"} {
		fmt.Printf("Scanning %s\n", fob)
		allowed := scanner.Scan(fob)
		fmt.Printf("Entry allowed: %t\n\n", allowed)
	}
}
