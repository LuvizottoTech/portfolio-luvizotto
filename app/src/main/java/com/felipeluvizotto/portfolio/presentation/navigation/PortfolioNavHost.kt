package com.felipeluvizotto.portfolio.presentation.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.felipeluvizotto.portfolio.presentation.about.AboutScreen
import com.felipeluvizotto.portfolio.presentation.contact.ContactScreen
import com.felipeluvizotto.portfolio.presentation.experience.ExperienceScreen
import com.felipeluvizotto.portfolio.presentation.home.HomeScreen
import com.felipeluvizotto.portfolio.presentation.projects.ProjectsScreen
import com.felipeluvizotto.portfolio.presentation.skills.SkillsScreen

@Composable
fun PortfolioNavHost(navController: NavHostController = rememberNavController()) {
    val currentBackStack by navController.currentBackStackEntryAsState()
    val currentDestination = currentBackStack?.destination
    val currentRoute = currentDestination?.route ?: Screen.Home.route

    Scaffold(
        bottomBar = { PortfolioBottomBar(currentRoute, navController) }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(navController = navController)
            }
            composable(Screen.About.route) {
                AboutScreen()
            }
            composable(Screen.Skills.route) {
                SkillsScreen()
            }
            composable(Screen.Experience.route) {
                ExperienceScreen()
            }
            composable(Screen.Projects.route) {
                ProjectsScreen()
            }
            composable(Screen.Contact.route) {
                ContactScreen()
            }
        }
    }
}
