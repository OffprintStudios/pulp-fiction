import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Resolvers */
import { DocsResolvers } from './resolvers/docs';
import { HomeResolvers } from './resolvers/home';
import { MigrationResolvers } from './resolvers/migration';
import { PortfolioResolvers } from './resolvers/portfolio';
import { Resolvers } from './resolvers';

/* Page Routes */
import { HomeRoutes } from './pages/home';
import { BrowseRoutes } from './pages/browse';
import { SocialRoutes } from './pages/social';
import { ContentViewRoutes } from './pages/content-views';
import { AccountRoutes } from './pages/account';
import { PortfolioRoutes } from './pages/portfolio';
import { SearchRoutes } from './pages/search';
import { DocsRoutes } from './pages/docs';
import { MigrationRoutes } from './pages/migration';
import { AuthGuard } from './shared/auth/services';

/* Util */
import { Roles } from '@dragonfish/models/users';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    ...HomeRoutes,
    ...BrowseRoutes,
    ...SocialRoutes,
    ...ContentViewRoutes,
    ...AccountRoutes,
    ...PortfolioRoutes,
    ...SearchRoutes,
    ...DocsRoutes,
    ...MigrationRoutes,
    {
        path: 'my-stuff',
        canLoad: [AuthGuard],
        loadChildren: () => import('@dragonfish/my-stuff').then((m) => m.MyStuffModule),
    },
    {
        path: 'dashboard',
        canLoad: [AuthGuard],
        data: { roles: [Roles.WorkApprover, Roles.Moderator, Roles.Admin] },
        loadChildren: () => import('@dragonfish/dashboard').then((m) => m.DashboardModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
    providers: [...DocsResolvers, ...HomeResolvers, ...MigrationResolvers, ...PortfolioResolvers, ...Resolvers],
})
export class AppRoutingModule {}
