import React from "react";
import { PreferencesProvider } from "./PreferenceContext";
import { SettingsProvider } from "./SettingsContext";

const AllProviders = ({ children }) => {
	return (
		<SettingsProvider>
			<PreferencesProvider>{children}</PreferencesProvider>
		</SettingsProvider>
	);
};

export default AllProviders;
