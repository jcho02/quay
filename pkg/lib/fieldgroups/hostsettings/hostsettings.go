package hostsettings

import (
	"errors"

	"github.com/creasty/defaults"
)

// HostSettingsFieldGroup represents the HostSettingsFieldGroup config fields
type HostSettingsFieldGroup struct {
	ExternalTlsTermination bool   `default:"false" validate:"" yaml:"EXTERNAL_TLS_TERMINATION"`
	PreferredUrlScheme     string `default:"http" validate:"" yaml:"PREFERRED_URL_SCHEME"`
	ServerHostname         string `default:"" validate:"" yaml:"SERVER_HOSTNAME"`
}

// NewHostSettingsFieldGroup creates a new HostSettingsFieldGroup
func NewHostSettingsFieldGroup(fullConfig map[string]interface{}) (*HostSettingsFieldGroup, error) {
	newHostSettingsFieldGroup := &HostSettingsFieldGroup{}
	defaults.Set(newHostSettingsFieldGroup)

	if value, ok := fullConfig["EXTERNAL_TLS_TERMINATION"]; ok {
		newHostSettingsFieldGroup.ExternalTlsTermination, ok = value.(bool)
		if !ok {
			return newHostSettingsFieldGroup, errors.New("EXTERNAL_TLS_TERMINATION must be of type bool")
		}
	}
	if value, ok := fullConfig["PREFERRED_URL_SCHEME"]; ok {
		newHostSettingsFieldGroup.PreferredUrlScheme, ok = value.(string)
		if !ok {
			return newHostSettingsFieldGroup, errors.New("PREFERRED_URL_SCHEME must be of type string")
		}
	}
	if value, ok := fullConfig["SERVER_HOSTNAME"]; ok {
		newHostSettingsFieldGroup.ServerHostname, ok = value.(string)
		if !ok {
			return newHostSettingsFieldGroup, errors.New("SERVER_HOSTNAME must be of type string")
		}
	}

	return newHostSettingsFieldGroup, nil
}
