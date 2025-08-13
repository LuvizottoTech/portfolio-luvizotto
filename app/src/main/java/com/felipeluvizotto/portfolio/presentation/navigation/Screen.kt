package com.felipeluvizotto.portfolio.presentation.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.WorkOutline
import androidx.compose.ui.graphics.vector.ImageVector
import com.felipeluvizotto.portfolio.R

sealed class Screen(val route: String, val titleResId: Int, val icon: ImageVector) {
    object Home : Screen("home", R.string.nav_home, Icons.Default.Home)
    object About : Screen("about", R.string.nav_about, Icons.Default.Person)
    object Skills : Screen("skills", R.string.nav_skills, Icons.Default.Code)
    object Experience : Screen("experience", R.string.nav_experience, Icons.Default.Business)
    object Projects : Screen("projects", R.string.nav_projects, Icons.Default.WorkOutline)
    object Contact : Screen("contact", R.string.nav_contact, Icons.Default.Email)

    companion object {
        val screens = listOf(Home, About, Skills, Experience, Projects, Contact)
    }
}
