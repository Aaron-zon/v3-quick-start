<script setup>
import { computed } from 'vue';
import { kebabCase } from 'lodash-es';
import DemoSvgIcon from './demoSvgIcon.vue';

const icons = ['404', 'bank', 'bug', 'close', 'dashboard', 'fullscreen-exit', 'fullscreen', 'link', 'lock', 'menu', 'money-cny-circle-line', 'test'];
const fas = computed(() => {
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'FillDrip', 'ArrowsToCircle', 'CircleChevronRight', 'ChevronCircleRight', 'At', 'TrashCan', 'TrashAlt', 'TextHeight', 'UserXmark', 'UserTimes', 'Stethoscope', 'Message', 'CommentAlt', 'Info', 'DownLeftAndUpRightToCenter', 'CompressAlt', 'Explosion', 'FileLines', 'FileAlt', 'FileText', 'WaveSquare', 'Ring', 'BuildingUn', 'DiceThree', 'CalendarDays', 'CalendarAlt', 'AnchorCircleCheck', 'BuildingCircleArrowRight', 'Volleyball', 'VolleyballBall', 'ArrowsUpToLine', 'SortDown', 'SortDesc', 'CircleMinus', 'MinusCircle', 'DoorOpen', 'RightFromBracket', 'SignOutAlt', 'Atom', 'Soap', 'Icons', 'HeartMusicCameraBolt', 'MicrophoneLinesSlash', 'MicrophoneAltSlash', 'BridgeCircleCheck', 'PumpMedical', 'Fingerprint', 'HandPointRight', 'MagnifyingGlassLocation', 'SearchLocation', 'ForwardStep', 'StepForward', 'FaceSmileBeam', 'SmileBeam', 'FlagCheckered', 'Football', 'FootballBall', 'SchoolCircleExclamation', 'Crop', 'AnglesDown', 'AngleDoubleDown', 'UsersRectangle', 'PeopleRoof', 'PeopleLine', 'BeerMugEmpty', 'Beer', 'DiagramPredecessor', 'ArrowUpLong', 'LongArrowUp', 'FireFlameSimple', 'Burn', 'Person', 'Male', 'Laptop', 'FileCsv'];
    return arr.map((item) => kebabCase(item));
})

const far = computed(() => {
    let arr = ['user', 'TrashCan', 'TrashAlt', 'Message', 'CommentAlt', 'FileLines', 'FileAlt', 'FileText', 'CalendarDays', 'CalendarAlt', 'HandPointRight', 'FaceSmileBeam', 'SmileBeam', 'FaceGrinStars', 'GrinStars', 'AddressBook', 'ContactBook', 'Comments', 'Paste', 'FileClipboard', 'FaceGrinTongueSquint', 'GrinTongueSquint', 'FaceFlushed', 'Flushed', 'SquareCaretRight', 'CaretSquareRight', 'SquareMinus', 'MinusSquare', 'Compass', 'SquareCaretDown', 'CaretSquareDown', 'FaceKissBeam', 'KissBeam', 'Lightbulb', 'Flag', 'SquareCheck', 'CheckSquare', 'CircleDot', 'DotCircle', 'FaceDizzy', 'Dizzy', 'Futbol', 'FutbolBall', 'SoccerBall', 'PenToSquare', 'Edit', 'HourglassHalf', 'Hourglass2', 'EyeSlash', 'Hand', 'HandPaper', 'HandSpock', 'FaceKiss', 'Kiss', 'FaceGrinTongue', 'GrinTongue', 'ChessBishop', 'FaceGrinWink', 'GrinWink', 'FaceGrinWide', 'GrinAlt', 'FaceFrownOpen', 'FrownOpen', 'HandPointUp', 'Bookmark', 'HandPointDown', 'Folder', 'FolderBlank', 'User', 'SquareCaretLeft', 'CaretSquareLeft', 'Star', 'ChessKnight', 'FaceLaughSquint', 'LaughSquint', 'FaceLaugh', 'Laugh', 'FolderOpen', 'Clipboard', 'ChessQueen', 'HandBackFist', 'HandRock', 'SquareCaretUp', 'CaretSquareUp'];
    return arr.map((item) => kebabCase(item));
})

const fab = computed(() => {
    let arr = ['Monero', 'Hooli', 'Yelp', 'CcVisa', 'Lastfm', 'Shopware', 'CreativeCommonsNc', 'Aws', 'Redhat', 'Yoast', 'Cloudflare', 'Ups', 'Pixiv', 'Wpexplorer', 'Dyalog', 'Bity', 'Stackpath', 'Buysellads', 'FirstOrder', 'Modx', 'Guilded', 'Vnv', 'SquareJs', 'JsSquare', 'Microsoft', 'Qq', 'Orcid', 'Java', 'Invision', 'CreativeCommonsPdAlt', 'Centercode', 'GlideG', 'Drupal', 'HireAHelper', 'CreativeCommonsBy', 'Unity', 'Whmcs', 'Rocketchat', 'Vk', 'Untappd', 'Mailchimp', 'Css3Alt', 'SquareReddit', 'RedditSquare', 'VimeoV', 'Contao', 'SquareFontAwesome', 'Deskpro', 'Brave', 'Sistrix', 'SquareInstagram', 'InstagramSquare', 'BattleNet', 'TheRedYeti', 'SquareHackerNews', 'HackerNewsSquare', 'Edge', 'Threads', 'Napster', 'SquareSnapchat', 'SnapchatSquare', 'GooglePlusG', 'Artstation', 'Markdown', 'Sourcetree', 'GooglePlus', 'Diaspora', 'Foursquare', 'StackOverflow', 'GithubAlt', 'PhoenixSquadron', 'Pagelines', 'Algolia', 'RedRiver', 'CreativeCommonsSa', 'Safari', 'Google', 'SquareFontAwesomeStroke', 'FontAwesomeAlt', 'Atlassian', 'LinkedinIn', 'DigitalOcean', 'Nimblr', 'Chromecast', 'Evernote'];
    return arr.map((item) => kebabCase(item));
})



</script>

<template>
    <div class="app-container">

        <el-card class="box-card">
            <template #header>
            <div class="card-header">
                <h2>SvgIcon</h2>
            </div>
            </template>
                <h4>@/icons.svg</h4>
                <div class="demo-list">
                    <DemoSvgIcon v-for="item in icons" :key="item" :title="item">
                        <SvgIcon :name="item"></SvgIcon>
                    </DemoSvgIcon>
                </div>
                
                <h4>font-awesome-icon solid</h4>
                <el-link class="font-awesome-link" type="success" href="https://fontawesome.com/search?o=r&m=free&s=solid">查看全部可用图标文档</el-link>
                
                <div class="demo-list">
                    <DemoSvgIcon v-for="item in fas" :key="item" :title="item">
                        <SvgIcon :icon="item"></SvgIcon>
                    </DemoSvgIcon>

                    <DemoSvgIcon :title="'。。。'" />
                </div>
                <h4>font-awesome-icon regular</h4>
                <el-link class="font-awesome-link" type="success" href="https://fontawesome.com/search?o=r&m=free&s=regular">查看全部可用图标文档</el-link>

                <div class="demo-list far">
                    <DemoSvgIcon v-for="item in far" :key="item" :title="item">
                        <SvgIcon type="far" :icon="item"></SvgIcon>
                    </DemoSvgIcon>

                    <DemoSvgIcon :title="'。。。'" />
                </div>

                <h4>font-awesome-icon brands</h4>
                <el-link class="font-awesome-link" type="success" href="https://fontawesome.com/search?o=r&m=free&f=brands">查看全部可用图标文档</el-link>
                <div class="demo-list fab">
                    <DemoSvgIcon v-for="item in fab" :key="item" :title="item">
                        <SvgIcon type="fab" :icon="item"></SvgIcon>
                    </DemoSvgIcon>

                    <DemoSvgIcon :title="'。。。'" />
                </div>

                <h4>element icons</h4>
                <el-link class="font-awesome-link" type="success" href="https://element-plus.org/zh-CN/component/icon.html">查看全部可用图标文档</el-link>
                <div class="demo-list fab">
                    <DemoSvgIcon title="Plus">
                        <el-icon><Plus /></el-icon>
                    </DemoSvgIcon>
                    <DemoSvgIcon title="Minus">
                        <el-icon><Minus /></el-icon>
                    </DemoSvgIcon>
                    <DemoSvgIcon title="CirclePlus">
                        <el-icon><CirclePlus /></el-icon>
                    </DemoSvgIcon>
                    <DemoSvgIcon title="Search">
                        <el-icon><Search /></el-icon>
                    </DemoSvgIcon>
                    <DemoSvgIcon :title="'。。。'" />
                </div>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>

.font-awesome-link {
    margin-bottom: 20px;
}

.demo-list {
    display: flex;
    flex-wrap: wrap;
}
</style>