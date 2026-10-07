package access

import "github.com/VASAFitness/technical_review_assessment/foundations_interviewer/turnstile"

type KeyFobScanner struct {
	device        *turnstile.Turnstile
	activeMembers map[string]bool
}

func NewKeyFobScanner(device *turnstile.Turnstile) *KeyFobScanner {
	return &KeyFobScanner{
		device: device,
		activeMembers: map[string]bool{
			"active-001":   true,
			"active-002":   true,
			"inactive-001": false,
		},
	}
}

// Scan allows active members in and denies all other fobs.
func (s *KeyFobScanner) Scan(fob string) bool {
	if s.activeMembers[fob] {
		s.device.Unlock()
		return true
	}

	s.device.Lock()
	return false
}
