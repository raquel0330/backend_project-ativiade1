function validateProfile(data) {
    const errors = [];

    if (!data.name || data.name.trim() === "") {
        errors.push("O nome é obrigatório.");
    }

    if (!data.email || data.email.trim() === "") {
        errors.push("O email é obrigatório.");
    }

    if (data.github_url && !isValidUrl(data.github_url)) {
        errors.push("A URL do GitHub é inválida.");
    }

    if (data.linkedin_url && !isValidUrl(data.linkedin_url)) {
        errors.push("A URL do LinkedIn é inválida.");
    }

    return errors;
}

function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

function toProfileResponse(profile) {
    return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        bio: profile.bio,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        created_at: profile.created_at
    };
}

module.exports = {
    validateProfile,
    toProfileResponse
};